class Item < ApplicationRecord
    validates :name, presence: true, uniqueness: true
    validates :price, presence: true

    has_many :store_items
end
