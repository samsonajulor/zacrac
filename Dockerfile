FROM public.ecr.aws/lambda/nodejs:16

COPY . .

RUN yarn

CMD [ "lambda.handler" ]
