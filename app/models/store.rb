class Store < ApplicationRecord
    validates :name, presence: true, uniqueness: true

    has_many :store_items
    has_many :cart_items

    has_one_attached :photo
end
