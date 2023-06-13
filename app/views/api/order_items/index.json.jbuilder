@order_items.each do |order_item|
    json.set! order_item.id do
        json.extract! order_item, :item_id, :quantity
    end
end