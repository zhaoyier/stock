export PATH := $(shell pwd)/node_modules/.bin:$(PATH)
SHELL := /bin/bash

# 建议每次只生成自己的服务
# 多个 service 文件以空格隔开

thriftServices =
protobufServices = apidoc/proto/account/account.proto


genservices:
	@$(foreach var, $(protobufServices), protoc --plugin=protoc-gen-json-ts=./node_modules/protoc-gen-json-ts/bin/protoc-gen-json-ts --json-ts_out=:src/services -I ./apidoc/proto $(var);)
	@$(foreach var, $(thriftServices), tgen gen -l typescript -m rest -i $(var) -o ./src/services;)
