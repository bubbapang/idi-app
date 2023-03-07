class CreateStoreItems < ActiveRecord::Migration[7.0]
  def change
    create_table :store_items do |t|
      t.bigint :store_id, null: false, references: :stores
      t.bigint :item_id, null: false, references: :items
      t.timestamps
    end
  end
end
