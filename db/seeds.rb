require 'open-uri'

# creating store items
puts "Destroying store items..."
StoreItem.destroy_all
puts "Resetting primary keys..."
ApplicationRecord.connection.reset_pk_sequence!('store_items')
puts "Creating store items..."
StoreItem.create!({store_id: 1, item_id: 1})
StoreItem.create!({store_id: 1, item_id: 2})
StoreItem.create!({store_id: 1, item_id: 3})

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

# Attach store photos
puts "Attaching store photos..."
Store.first(6).each_with_index do |store, index|
    store.photo.attach(
        # The string passed to URI.open should be the URL of the image in its bucket.
        # This sample assumes the bucket name is `grocer-ease-seeds`.
        io: URI.open("https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/store_#{index + 1}.jpg"), 
        filename: "store_#{index + 1}.jpg"
    )
end

# creating items
puts "Destroying items..."
Item.destroy_all
puts "Resetting primary keys..."
ApplicationRecord.connection.reset_pk_sequence!('items')
puts "Creating items..."
Item.create!({name: 'Watermelon', price: 3.00})
Item.create!({name: 'Green Onion', price: 2.00})
Item.create!({name: 'Dragon fruit', price: 7.00})

# Attach item photos
puts "Attaching item photos..."
Item.first(3).each_with_index do |item, index|
    item.photo.attach(
        # The string passed to URI.open should be the URL of the image in its bucket.
        # This sample assumes the bucket name is `grocer-ease-seeds`.
        io: URI.open("https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/item_#{index + 1}.jpg"), 
        filename: "item_#{index + 1}.jpg"
    )
end