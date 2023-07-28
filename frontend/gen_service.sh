#!/bin/bash
new_file_name=""

file_extension=""

templates_dir_path="templates"

path="./src/services"
file_type="service"
file_extension="js"

### Reading file name ###
echo "$file_type's name? (without suffix)"
read new_file_name

### Creating (JS) file ###
cp "$templates_dir_path/$file_type.$file_extension" $path/
mv $path/$file_type.$file_extension $path/$new_file_name-$file_type.$file_extension 

echo Success! 🚀🚀🚀
echo "⚠️ Remember to update the class name"