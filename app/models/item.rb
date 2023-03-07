class Item < ApplicationRecord
    validates :name, presence: true, uniqueness: true
    validates :price, presence: true

    has_many :store_items
    has_many :cart_items
end
