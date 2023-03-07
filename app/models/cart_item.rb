class CartItem < ApplicationRecord
    belongs_to :user
    belongs_to :store
    belongs_to :item
end
