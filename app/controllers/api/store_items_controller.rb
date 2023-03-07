class Api::StoreItemsController < ApplicationController
    def index
        puts "params = #{params}"
        @store_items = StoreItem.where(store_id: params[:store_id])
        render :index
    end
end
