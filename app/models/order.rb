class Order < ApplicationRecord
  validates :user_id, presence: true
  validates :store_id, presence: true
  validates :total, presence: true

  belongs_to :user
  belongs_to :store
  has_many :order_items, dependent: :destroy
end