# extracting the attributes from the store model
@stores.each do |store|
    json.set! store.id do
        json.extract! store, :id, :name
    end
end