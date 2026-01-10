#!/bin/bash
npm run build
mkdir -p dist/content
cp -r content/* dist/content/
echo "Build completed with content folder copied to dist/"
