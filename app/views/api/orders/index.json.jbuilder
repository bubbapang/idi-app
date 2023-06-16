@orders.each do |order|
    json.set! order.id do
        json.store_id order.store_id
        json.total order.total
        json.datetime order.created_at.to_i

        # array of order items
        json.items order.order_items do |order_item|
            json.extract! order_item, :item_id, :quantity
        end
    end
end
