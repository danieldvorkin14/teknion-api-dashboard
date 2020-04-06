class ApiConnection < ApplicationRecord
  def check_status
    resp = begin
      Faraday.get url
    rescue
      { status: 404, reason_phrase: "Not Found" }
    end

    return { status: resp[:status] || resp.status, phrase: resp[:reason_phrase] || resp.reason_phrase }
  end
end
