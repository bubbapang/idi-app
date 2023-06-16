class Api::StoreItemsController < ApplicationController
    def index
        puts "params: #{params}"
        if params[:store_id]
            @store_items = StoreItem.where(store_id: params[:store_id])
        else
            @store_items = StoreItem.all
        end
        render :index
    end
end
