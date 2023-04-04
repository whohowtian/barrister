FROM python:3-slim
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./barrister_ingredient.py .
CMD [ "python", "./barrister_ingredient.py" ]