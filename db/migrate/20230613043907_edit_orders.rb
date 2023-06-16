class EditOrders < ActiveRecord::Migration[7.0]
  def change
    add_column :orders, :store_id, :bigint

    # Assuming you want to set all existing orders to belong to the store with id 1
    Order.update_all(store_id: 1)

    change_column_null :orders, :store_id, false
end


end
