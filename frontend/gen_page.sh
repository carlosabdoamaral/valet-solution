#!/bin/bash
new_file_name=""
new_file_path=""

file_type="page"
file_extension=""

templates_dir_path="templates"
new_file_path=""

# Reading file name
echo "$file_type's name? (without suffix)"
read new_file_name

# Creating folder
new_file_path="./src/app/pages/$new_file_name"
mkdir $new_file_path

### Creating (JSX) file ###
file_extension="jsx"
cp "$templates_dir_path/$file_type.$file_extension" $new_file_path/
mv $new_file_path/$file_type.$file_extension $new_file_path/$new_file_name-$file_type.$file_extension 

# Creating (SCSS) file
file_extension="scss"
touch $new_file_path/$new_file_name-$file_type.$file_extension

echo Success! 🚀🚀🚀
echo "⚠️ Remember to update the class name"
echo "⚠️ Remember to import the scss file into your jsx"