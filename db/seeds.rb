# importing gems
require 'open-uri'

# clearing database
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

# ITEMS
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
# creating trader joe's item
Item.create!({name: "Jack Link's Original Beef Jerky", price: 6.99})
# creating whole foods item
Item.create!({name: 'SNICKERS Ice Cream Bars', price: 6.49})
# creating walgreens item
Item.create!({name: 'Walgreens 100% Pure Skin Protectant Petroleum Jelly', price: 2.99})
# creating walmart item
Item.create!({name: 'Ja-Ru Inc. Ooze, Rainbow, Age 3+', price: 6.99})
# creating dicks sporting goods items
Item.create!({name: "Under Armour Men's HeatGear Armour 2.0 Leggings - Black - XL", price: 35.00})
Item.create!({name: "Under Armour Men's UA Tech 2.0 Short Sleeve Shirt - 600-Red & Black - XL", price: 25.00})
Item.create!({name: 'RIP-IT Vision Pro - Matte Black - XL', price: 69.99})
Item.create!({name: 'Franklin Sports Professional Volleyball Set - One Size', price: 110.00})
Item.create!({name: "adidas Men's Samba Classic Running Shoes - Black & White - 13", price: 75.00})
Item.create!({name: "Smartwool Men's Performance Hike Full Cushion Crew - 001 Black - XL", price: 25.00})
# creating sephora items
Item.create!({name: 'beautyblender Makeup Studio Blending Sponge', price: 20.00})
Item.create!({name: 'Peace Out Salicylic Acid Acne Healing Dots', price: 19.00})
Item.create!({name: 'Charlotte Tilbury Beauty Pillow Talk Mini Pillow Talk Lipstick & Liner Set', price: 25.00})
Item.create!({name: 'LANEIGE Lip Sleeping Mask', price: 24.00})
# creating bed bath & beyond items
Item.create!({name: 'Simply Essential 10 Piece Utensil Set', price: 13.49})
Item.create!({name: 'Cuisinart 7-Speed Hand Mixer With Storage Case In Silver', price: 55.99})
Item.create!({name: 'Squared Away Set of 50 Velvet Slim Suit Hangers in Grey With Matte Black Hook', price: 39.19})
Item.create!({name: 'UGG Devon Down Alternative Quilted King Comforter in White', price: 111.99})

# STORE ITEMS
# creating payless store items
puts "Creating store items..."
18.times do |item_id|
    StoreItem.create!({store_id: 1, item_id: item_id + 1})
end
# creating trader joe's store item
StoreItem.create!({store_id: 2, item_id: 19})
# creating whole foods store item
StoreItem.create!({store_id: 3, item_id: 20})
# creating walgreens store item
StoreItem.create!({store_id: 4, item_id: 21})
# creating walmart store item
StoreItem.create!({store_id: 5, item_id: 22})
# creating dicks sporting goods store items
6.times do |item_id|
    StoreItem.create!({store_id: 6, item_id: item_id + 23})
end
# creating sephora store items
4.times do |item_id|
    StoreItem.create!({store_id: 7, item_id: item_id + 29})
end
# creating bed bath & beyond store items
4.times do |item_id|
    StoreItem.create!({store_id: 8, item_id: item_id + 33})
end

# Attaching store photos
puts "Attaching store photos..."
Store.first(8).each_with_index do |store, index|
    puts "#{store.name}..."
    store.photo.attach(
        # The string passed to URI.open should be the URL of the image in its bucket.
        # This sample assumes the bucket name is `grocer-ease-seeds`.
        io: URI.open("https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/store_#{index + 1}.jpg"), 
        filename: "store_#{index + 1}.jpg"
    )
end

# Attaching item photos
puts "Attaching item photos..."
Item.first(36).each_with_index do |item, index|
    puts "#{index + 1}..."
    item.photo.attach(
        # The string passed to URI.open should be the URL of the image in its bucket.
        # This sample assumes the bucket name is `grocer-ease-seeds`.
        io: URI.open("https://grocer-ease-seeds.s3.us-west-1.amazonaws.com/item_#{index + 1}.jpg"), 
        filename: "item_#{index + 1}.jpg"
    )
end

