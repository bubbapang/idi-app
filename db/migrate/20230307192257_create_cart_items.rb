class CreateCartItems < ActiveRecord::Migration[7.0]
  def change
    create_table :cart_items do |t|
      t.bigint :store_id, null: false, references: :stores
      t.bigint :item_id, null: false, references: :items
      t.timestamps
    end
    add_index :cart_items, :store_id, unique: true
  end
end
