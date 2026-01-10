#!/bin/bash
npm run build
cp -r content dist/content
echo "Build completed with content folder copied to dist/"
