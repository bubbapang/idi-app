class EditCartItems < ActiveRecord::Migration[7.0]
  def change
    add_column :cart_items, :user_id, :bigint, null: false, foreign_key: true, index: true
  end
end
