require 'open-uri'

User.destroy_all
Store.destroy_all
Item.destroy_all
StoreItem.destroy_all
CartItem.destroy_all
ApplicationRecord.connection.reset_pk_sequence!('users')
ApplicationRecord.connection.reset_pk_sequence!('stores')
ApplicationRecord.connection.reset_pk_sequence!('items')
ApplicationRecord.connection.reset_pk_sequence!('store_items')
ApplicationRecord.connection.reset_pk_sequence!('cart_items')

# users
puts "Creating users..."
User.create!(email: 'demo@user.io', password: 'password')

# stores
puts "Creating stores..."
stores = [
    'Payless Supermarkets',
    'Trader Joe\'s',
    'Whole Foods Market',
    'Walgreens',
    'Walmart',
    'Dick\'s Sporting',
    'Sephora',
    'Bed Bath & Beyond'
]

8.times do |i|
    Store.create!({name: stores[i]})
end

# creating payless items
puts "Creating 18 items..."
Item.create!({name: 'California Giant Long Stem Strawberries', price: 9.19})
Item.create!({name: "Driscoll's Sweetest Batch Blackberries", price: 5.79})
Item.create!({name: 'Organic Girl Baby Spinach', price: 5.19})
Item.create!({name: 'Organic Girl Baby Spring Mix', price: 5.19})
Item.create!({name: 'Organic Girl Spring Mix & Baby Spinach, 50/50!', price: 5.19})
Item.create!({name: 'The Little Potato Company Potatoes, Fresh Creamer, Dynamic Duo', price: 4.59})
Item.create!({name: 'Pete and Gerry’s Organic Eggs Eggs, Organic, Free Range, Large', price: 8.69})
Item.create!({name: 'Sargento Natural String Cheese Snacks', price: 4.59})
Item.create!({name: 'Babybel Light Semisoft Cheese', price: 6.89})
Item.create!({name: 'FAGE Greek Strained Yogurt with Strawberry', price: 2.19})
Item.create!({name: 'The Laughing Cow Creamy Light Swiss Cheese Spread', price: 4.59})
Item.create!({name: 'Califia Farms Unsweetened Almondmilk', price: 6.39})
Item.create!({name: 'Signature Beef Patties, 91% Lean/9% Fat', price: 17.29})
Item.create!({name: 'Signature Beef Patties, 80% Lean/20% Fat', price: 14.99})
Item.create!({name: 'Waterfront Bistro Salmon, Atlantic, Nova Lox, New York Style, Smoked', price: 7.49})
Item.create!({name: 'Waterfront Bistro Cooked Shrimp (51-60 Count)', price: 22.99})
Item.create!({name: 'BLACK LABEL Thick Cut Bacon', price: 8.09})
Item.create!({name: 'SeaPak Jumbo Coconut Shrimp with Orange Marmalade Sauce', price: 14.99})

# creating payless store items
puts "Creating store items..."
18.times do |item_id|
    StoreItem.create!({store_id: 1, item_id: item_id + 1})
end

# Attach store photos
puts "Attaching store photos..."
Store.first(8).each_with_index do |store, index|
    store.photo.attach(
        # The string passed to URI.open should be the URL of the image in its bucket.
        # This sample assumes the bucket name is `grocer-ease-seeds`.
        io: URI.open("https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/store_#{index + 1}.jpg"), 
        filename: "store_#{index + 1}.jpg"
    )
end

# Attach item photos
puts "Attaching item photos..."
Item.first(18).each_with_index do |item, index|
    item.photo.attach(
        # The string passed to URI.open should be the URL of the image in its bucket.
        # This sample assumes the bucket name is `grocer-ease-seeds`.
        io: URI.open("https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/item_#{index + 1}.jpg"), 
        filename: "item_#{index + 1}.jpg"
    )
end