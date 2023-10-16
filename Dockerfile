# 配置操作系统 与运行环境
FROM node:14-alpine

# 复制应用程序文件
# source 相对于dockerfile 的源路径  dest 相对于镜像的路径
COPY './src' '/'

CMD [ "node" './src/configuration.ts' ]
# CMD node ./src/configuration.ts
