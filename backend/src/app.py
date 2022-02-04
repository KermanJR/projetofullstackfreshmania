
#IMPORTAÇÃO DE BIBLIOTECAS
from imp import reload
import boto3
from flask import Flask, jsonify, request, send_file, redirect, url_for
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
from bson import ObjectId
from werkzeug.utils import secure_filename


#INSTANCIAÇÃO DO FLASK  E CRIAÇÃO DO BANCO DE DADOS
app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost/freshproducts'
mongo = PyMongo(app)
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'upload/')

#CONFIGURAÇÕES GERAIS DE CONEXÃO COM BUCKET AWS S3 (FICA A OPÇÃO DE GOOGLE CLOUD)
s3 = boto3.client('s3',
                  aws_access_key_id= '',
                  aws_secret_access_key = '',
                ) 

#NOME DO BUCKET AWS
BUCKET_NAME = 'freshmaniabucket'



#CONFIGURAÇÕES DE POLÍTICA DE PRIVACIDADE CORS
CORS(app)

#CRIAÇÃO DA COLEÇÃO PRODUCTS NO MONGODB
db = mongo.db.products

#API IMAGENS DOS PRODUTOS
url = 'http://localhost:5000/upload/'


#-> ROTA DEFINIDA PARA A CRIAÇÃO E INSERÇÃO DE UM NOVO PRODUTO NO BANCO DE DADOS
@app.route('/products', methods=['POST'])
def createUser():

    #-> SALVANDO IMAGEM NO SERVIDOR E BANCO DE DADOS
    profile_image = request.files['profile_image']
    filename = secure_filename(profile_image.filename)
    profile_image.save(UPLOAD_FOLDER + filename)
    id = db.insert_one({
      'name': request.form.get('name'),
      'mark': request.form.get('mark'),
      'price': request.form.get('price'),
      'image': profile_image.filename
    })

    #CONFIGURAÇÕES DE ARMAZENAMENTO EM BUCKET DO AWS S3
    '''s3.upload_file(
      Bucket = BUCKET_NAME,
      Filename = filename,
      Key = filename
    )'''
    return redirect('http://localhost:3000')
   



#-> ROTA DEFINIDA PARA A BUSCA DE UM IMAGEM ESPEFÍCICA DE UM PRODUTO
@app.route('/upload/<filename>')
def upload(filename):
  file = os.path.join(UPLOAD_FOLDER, filename)
  return send_file(file)


#-> ROTA DEFINIDA PARA A BUSCA E RETORNO DE TODOS OS PRODUTOS ARMAZENADOS NO BANCO DE DADOS
@app.route('/products', methods=['GET'])
def getUsers():
    listProducts = []
    for products in db.find():
          listProducts.append({
            '_id': str(ObjectId( products['_id'])),
            'name':  products['name'],
            'mark':  products['mark'],
            'price': products['price'],
            'image': os.path.join(url,  products['image'])
            
          })
    
    return jsonify(listProducts)


#-> ROTA DEFINIDA PARA A BUSCA E RETORNO DE UM PRODUTO ESPECÍFICO DO BANCO DE DADOS ATRAVÉS DE UM ID
@app.route('/products/<id>', methods=['GET'])
def getUser(id):
  products = db.find_one({'_id': ObjectId(id)})
  return jsonify({
      '_id': str(ObjectId(products['_id'])),
      'name': products['name'],
      'mark':  products['mark'],
      'price': products['price'],
      'image': products['image']
       
  })

#-> ROTA DEFINIDA PARA A REMOÇÃO DE PRODUTOS DA LOJA. RECEBE O ID DO PRODUTO QUE QUEREMOS REMOVER
@app.route('/products/<id>', methods=['DELETE'])
def deleteUser(id):
  db.delete_one({'_id': ObjectId(id)})
  return jsonify({'Mensagem': 'Produto removido com sucesso'})


#-> ROTA DEFINIDA PARA A ALTERAÇÃO DE PRODUTOS. RECEBE O ID DO PRODUTO QUE QUEREMOS ALTERAR
@app.route('/products/<id>', methods=['PUT'])
def updateUser(id):
  db.update_one({'_id': ObjectId(id)}, {"$set": {
    'name':request.json['name'],
    'mark': request.json['mark'],
    'price': request.json['price'],
    'image': request.json['image']
  }}
  
  )
  return redirect('http://localhost:3000')

if __name__ == "__main__":
    app.run(debug=True)
