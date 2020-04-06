# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ApiConnection.create({
    name: 'OnePlace | GatewayTest',
    url: 'https://gateway-test.teknion.com',
    active: true,
    status: nil,
    description: 'One Place Gateway Test Environment API'
})

ApiConnection.create({
    name: 'OnePlace | Staging',
    url: 'https://teknion-staging.herokuapp.com',
    active: true,
    status: nil,
    description: 'One Place Gateway Staging Environment API'
})

ApiConnection.create({
    name: 'OnePlace | Production',
    url: 'https://oneplace.teknion.com',
    active: true,
    status: nil,
    description: 'One Place Gateway Production Environment API'
})