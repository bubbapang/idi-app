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
        # from order params, iterate through the order attributes for
        # each order item, and make new order items after making the order
        # order_attributes: [:product_id, :quantity]

        # making the order
        without_order_attributes = order_params.except(:order_attributes)
        puts("order params", without_order_attributes)
        @order = Order.new(without_order_attributes)
        @order_params = order_params



        if @order.save
            # getting the order item attributes
            order_attributes = order_params[:order_attributes]
            puts("order_attributes", order_attributes)

            # iterating through the order item raw data
            order_attributes.each do |attributes|
                # making them into order items instances
                item_id = attributes[:item_id]
                quantity = attributes[:quantity]

                puts("@order", @order)
                puts("@order.id", @order.id)
                puts("item_id", item_id)
                puts("quantity", quantity)
                @order_item = OrderItem.new(order_id: @order.id, item_id: item_id, quantity: quantity)
                if @order_item.save
                    puts("order item saved")
                else
                    puts("order item not saved")
                end
            end
            render json: @order, status: :created
        else
            render json: @order.errors.full_messages, status: :unprocessable_entity
        end
    end

    private

    def order_params
        params.require(:order).permit(:user_id, :total, order_attributes: [:item_id, :quantity])
    end
    
end
