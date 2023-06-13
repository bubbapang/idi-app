@orders.each do |order|
    json.set! order.id do
        json.total order.total
        json.datetime order.created_at.to_i

        # NEW WAY
        # json.items @order_params[:order_attributes] do |order_item|
        #     json.item_id order_item[:item_id]
        #     json.quantity order_item[:quantity]
        # end

        # OLD WAY
        json.items order.order_items do |order_item|
            json.extract! order_item, :item_id, :quantity
        end
    end
end
