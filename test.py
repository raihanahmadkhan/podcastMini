import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

audio_file_path = "huberman_dopamine_episode.mp3"

with open(audio_file_path, "rb") as audio_file:
    transcript = openai.Audio.transcriptions.create(
        model="whisper-1", 
        file=audio_file
    )

print("Transcription:")
print(transcript.text)
