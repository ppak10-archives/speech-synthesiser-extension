from http import HTTPStatus
from flask import Flask, jsonify, request
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
  if not request.is_json:
    return (
      jsonify({"error": "INVALID_REQUEST_FORMAT"}, HTTPStatus.BAD_REQUEST)
    )

  try:
    data = request.get_json()
  synthesis_input = texttospeech.SynthesisInput(text="Hello World")

  voice = texttospeech.VoiceSelectionParams(
    language_code="en-US", ssml_gender=texttospeech.SsmlVoiceGender.NEUTRAL
  )

  audio_config = texttospeech.AudioConfig(
    audio_encoding=texttospeech.AudioEncoding.MP3
  )

  response = client.synthesize_speech(
    input=synthesis_input, voice=voice, audio_config=audio_config
  )

  with open("output.mp3", "wb") as out:
    out.write(response.audio_content)
    print('Audio content written to file')

  return jsonify({}), HTTPStatus.OK
