class EditCartItemsForTheThirdTime < ActiveRecord::Migration[7.0]
  def change
    remove_index :cart_items, :store_id
    add_index :cart_items, [:user_id, :store_id, :item_id], unique: true
  end
end
