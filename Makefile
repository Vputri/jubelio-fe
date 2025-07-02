# Makefile for jubelio-fe (React + Vite + TypeScript)

.PHONY: install dev build preview lint clean

install:
	npm install

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

lint:
	npm run lint

clean:
	rm -rf dist 