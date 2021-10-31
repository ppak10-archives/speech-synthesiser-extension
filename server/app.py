from base64 import encodebytes
from http import HTTPStatus
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from google.cloud import texttospeech

app = Flask(__name__)
client = texttospeech.TextToSpeechClient()

CORS(app)

@app.route('/')
def index():
  return 'Index Page'

@app.route('/synthesize', methods=['POST'])
def synthesize():
  if request.method == "POST":
    if not request.is_json:
      return (
        jsonify({"error": "INVALID_REQUEST_FORMAT"}, HTTPStatus.BAD_REQUEST)
      )

    try:
      data = request.get_json()
      print('text', data, data["input"]["text"])
      synthesis_input = texttospeech.SynthesisInput(text=data["input"]["text"])

      voice = texttospeech.VoiceSelectionParams(
        language_code="en-US", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
      )

      audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
      )

      response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
      )

      return jsonify({"audio_content": encodebytes(response.audio_content).decode()}), HTTPStatus.OK

    except:
      return jsonify({}), HTTPStatus.BAD_REQUEST

  return jsonify({}), HTTPStatus.BAD_REQUEST
