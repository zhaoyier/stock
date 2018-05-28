#!/bin/bash

# 遍历目录文件，删除空的文件夹和*.pb.go文件
function clean() {
    rm -f `find . -name '*.pb.go'`;rm -f `find . -name '*.cs'`;rm -rf `find . -type d -empty`
}


# 遍历*.proto文件，生成对应的*.pb.go文件
function generate_go(){
    for file in ` ls $1 `  #遍历目录
    do
        if [ -d $1"/"${file} ]  #判断是否是目录
        then
             generate_go $1"/"${file}
        elif [ ${file##*.} = "proto" ]  #判断后缀名是否为sh     ${file%.*}”获取不含后缀的文件
        then
            if [ "$1" = "." ]
            then
                mkdir $1/${file%%.*}
                protoc --go_out=plugins=grpc:$1/${file%%.*} $1/${file}
            else
                cd $1 && mkdir ${file%%.*}
                protoc --go_out=plugins=grpc:./${file%%.*} ${file}
                cd -
            fi
        fi
    done
}

function generate_c#(){
    for file in `ls $1`
    do
        if [ -d $1/${file} ];then
            generate_c# $1/${file}
        else
            if [[ "$q/$file" =~ "proto" ]]; then
                if [[ "$1" == "." ]]; then
                    mkdir $1/${file%%.*}
                    protoc --csharp_out=$1/${file%%.*} $1/${file}
                else
                    cd $1 && mkdir ${file%%.*}
                    protoc --csharp_out=./${file%%.*} ${file} --proto_path=./
                    cd -
                fi
            fi
        fi
    done
}

#function copy_replace(){
#    for file in ` ls $1 `  #遍历目录
#    do
#        if [ -d $1"/"${file} ]  #判断是否是目录
#        then
#             copy_replace $1"/"${file}
#        elif [ ${file##*.} = "proto" ]  #判断后缀名是否为sh     ${file%.*}”获取不含后缀的文件
#        then
#            cp $1"/"${file} $1"/"${file}_bk
#            sed "s/required //g;s/proto2/proto3/g" $1"/"${file} > $1"/"${file}_new
#            mv $1"/"${file}_new $1"/"${file}
#        fi
#    done
#}

function undo() {
    for file in ` ls $1 `  #遍历目录
    do
        #判断是否是目录
        if [ -d $1"/"${file} ];then
             undo $1"/"${file}
        #判断后缀名是否为proto_bk     ${file%.*}”获取不含后缀的文件
        elif [ ${file##*.} = "go_replace" ];then
            mv $1"/"${file} $1"/"${file/_replace/}
        fi
    done
}

function replace_path() {
    for file in ` ls $1 `  #遍历目录
    do
        #判断是否是目录
        if [ -d $1"/"${file} ];then
            replace_path $1"/"${file}
        elif [ ${file} = "hello.pb.go" ];then
            sed "s/import basic \".\"/import basic \"edroity\.com\/proto\/basic\"/g" $1"/"${file} > $1"/"${file}_replace
        elif [ ${file} = "fight.pb.go" ];then
            sed -e "s/import role \".\"/import role \"edroity\.com\/proto\/role\"/g" -e "s/import base \".\"/import base \"edroity\.com\/proto\/base\"/g" $1"/"${file} > $1"/"${file}_replace
        elif [ ${file} = "session.pb.go" ];then
            sed -e "s/import fight \".\"/import fight \"edroity\.com\/proto\/fight\"/g" -e "s/import base \".\"/import role \"edroity\.com\/proto\/base\"/g" $1"/"${file} > $1"/"${file}_replace
        elif [ ${file} = "base.pb.go" ];then
            sed "s/import data \"data\"/import data \"edroity\.com\/proto\/data\/data\"/g" $1"/"${file} > $1"/"${file}_replace
        elif [ ${file} = "api.pb.go" ]; then
            sed "s/import data \".\"/import data \"edroity\.com\/proto\/data\/data\"/g" $1"/"${file} > $1"/"${file}_replace
        elif [ ${file} = "role.pb.go" ]; then
            sed "s/import base \".\"/import base \"edroity\.com\/proto\/base\"/g" $1"/"${file} > $1"/"${file}_replace
        fi
    done
}

#判断参数
if [ $# -eq 0 ];then
    echo "请输入参数:go、c#、clean"
elif [ $1 == "go" ];then
    clean
    #copy_replace $2 "."
    generate_go $2 "."
    replace_path $2 "."
    undo $2 "."
elif [ $1 == "c#" ];then
    clean
    generate_c# $2 "."
elif [ $1 == "clean" ];then
    clean
else
    echo "请输入正确的参数:go、c#、clean"
fi