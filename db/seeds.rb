# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# creating users

puts "Destroying tables..."
# Unnecessary if using `rails db:seed:replant`
User.destroy_all

puts "Resetting primary keys..."
# For easy testing, so that after seeding, the first `User` has `id` of 1
ApplicationRecord.connection.reset_pk_sequence!('users')

puts "Creating users..."
# Create one user with an easy to remember email, and password:
User.create!(
  email: 'demo@user.io', 
  password: 'password'
)

# More users
10.times do 
  User.create!({
    email: Faker::Internet.unique.email,
    password: 'password'
  }) 
end

# creating items

# require "open-uri"

# puts "Destroying tables..."
# Item.destroy_all

# puts "Resetting primary keys..."
# ApplicationRecord.connection.reset_pk_sequence!('items')

# puts "Creating items..."
# # Create 3 items with easy to remember names, and prices:
# Item.create!({
#   name: 'Watermelon',
#   price: 3.00
# })

# Item.create!({
#   name: 'Green Onion',
#   price: 2.00
# })

# Item.create!({
#   name: 'Dragon fruit',
#   price: 7.00
# })

# # More items
# 10.times do
#   Item.create!({
#     name: Faker::Food.unique.ingredient,
#     price: rand(1.00..10.00).round(2)
#   })
# end

# # Attach item photos
# Item.first(3).each_with_index do |item, index|
#   item.photo.attach(
#     # The string passed to URI.open should be the URL of the image in its bucket.
#     # This sample assumes the bucket name is `grocer-ease-seeds`.
#     io: URI.open("https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/item_#{index + 1}.jpg"), 
#     filename: "item_#{index + 1}.jpg"
#   )
# end






# dont use application transaction when seeding with AWS
# dont use application transaction when seeding with AWS
# dont use application transaction when seeding with AWS
# dont use application transaction when seeding with AWS
# dont use application transaction when seeding with AWS
# dont use application transaction when seeding with AWS
# dont use application transaction when seeding with AWS
# dont use application transaction when seeding with AWS
# dont use application transaction when seeding with AWS
# dont use application transaction when seeding with AWS
# dont use application transaction when seeding with AWS
# dont use application transaction when seeding with AWS