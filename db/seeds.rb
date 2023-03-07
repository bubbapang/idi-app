# users
puts "Destroying users..."
User.destroy_all
puts "Resetting primary keys..."
ApplicationRecord.connection.reset_pk_sequence!('users')
puts "Creating users..."
User.create!(email: 'demo@user.io', password: 'password')
puts "Creating 10 users..."
10.times do User.create!({email: Faker::Internet.unique.email, password: 'password'}) end

# stores
puts "Destroying stores..."
Store.destroy_all
puts "Resetting primary keys..."
ApplicationRecord.connection.reset_pk_sequence!('stores')
puts "Creating stores..."
Store.create!(name: 'Payless Supermarkets')
Store.create!(name: 'Trader Joe\'s')
Store.create!(name: 'Whole Foods')
Store.create!(name: 'Safeway')
Store.create!(name: 'Costco')
Store.create!(name: 'Target')

# creating items
puts "Destroying items..."
Item.destroy_all
puts "Resetting primary keys..."
ApplicationRecord.connection.reset_pk_sequence!('items')
puts "Creating items..."
Item.create!({name: 'Watermelon', price: 3.00})
Item.create!({name: 'Green Onion', price: 2.00})
Item.create!({name: 'Dragon fruit', price: 7.00})





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

