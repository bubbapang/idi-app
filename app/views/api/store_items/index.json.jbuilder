@store_items.each do |store_item|
    json.set! store_item.id do
        json.extract! store_item, :id, :name, :price
    end
end