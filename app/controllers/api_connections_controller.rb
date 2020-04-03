class ApiConnectionsController < ApplicationController
  before_action :set_api_connection, only: [:show, :update, :destroy]

  # GET /api_connections
  def index
    @api_connections = ApiConnection.all

    render json: @api_connections
  end

  # GET /api_connections/1
  def show
    render json: @api_connection
  end

  # POST /api_connections
  def create
    @api_connection = ApiConnection.new(api_connection_params)

    if @api_connection.save
      render json: @api_connection, status: :created, location: @api_connection
    else
      render json: @api_connection.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api_connections/1
  def update
    if @api_connection.update(api_connection_params)
      render json: @api_connection
    else
      render json: @api_connection.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api_connections/1
  def destroy
    @api_connection.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_api_connection
      @api_connection = ApiConnection.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def api_connection_params
      params.require(:api_connection).permit(:url, :name, :description, :active, :status)
    end
end
