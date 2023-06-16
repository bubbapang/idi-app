class Api::OrdersController < ApplicationController
    def index
        # find the user
        user = User.find(params[:user_id])

        # getting all the user's orders
        @orders = user.orders

        # extracting the attributes from the order model
        render :index
    end

    def create
        puts("order_params: #{order_params}")
        without_order_attributes = order_params.except(:order_attributes)
        # making the order
        @order = Order.new(without_order_attributes)

        if @order.save
            # getting the order item attributes
            order_attributes = order_params[:order_attributes]

            # iterating through the order item raw data
            order_attributes.each do |attributes|
                # making them into order items instances
                item_id = attributes[:item_id]
                quantity = attributes[:quantity]
                @order_item = OrderItem.new(order_id: @order.id, item_id: item_id, quantity: quantity)
                if @order_item.save
                    puts("order item saved")
                    puts("order item saved")
                    puts("order item saved")
                else
                    puts("order item not saved")
                    puts("order item not saved")
                    puts("order item not saved")
                end
            end
            render :show
        else
            render json: @order.errors.full_messages, status: :unprocessable_entity
        end
    end

    private

    def order_params
        params.require(:order).permit(:user_id, :store_id, :total, order_attributes: [:item_id, :quantity])
    end
    
end
