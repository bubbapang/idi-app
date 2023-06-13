class CreateOrderItemsAgain < ActiveRecord::Migration[6.0]
  def change
    drop_table :order_items
  end
end
