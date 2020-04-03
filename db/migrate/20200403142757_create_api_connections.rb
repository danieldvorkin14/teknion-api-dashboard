class CreateApiConnections < ActiveRecord::Migration[6.0]
  def change
    create_table :api_connections do |t|
      t.string :url
      t.string :name
      t.string :description
      t.string :status
      t.boolean :active, default: true

      t.timestamps
    end
  end
end
