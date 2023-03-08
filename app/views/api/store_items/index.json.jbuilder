@store_items.each do |store_item|
    json.set! store_item.id do
        json.extract! store_item, :id, :store_id, :item_id
    end
end