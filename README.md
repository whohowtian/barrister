# Barrister
Cocktail creation and ordering microservices application for our IS213 project

# Our Team
1. Jeffry
2. Valerie
3. Selina
4. Hao Tian
5. Zhijie
6. Natalie

# Project Overview:
Barrister is an application that allows users to customise and order its own cocktail using the 2-1-1 or “Golden Ratio” formula. The cocktails will then be prepared in-house and delivered to them via third-party delivery drivers. The term “Barrister” also means open court lawyer. Thus, our interface design is heavily inspired by anything that resembles law firms, courts, or any jurisdictional setting.

# Setting up and running the application
1. Ensure you have MySQL installed and configured on port 3306.
2. Ensure Docker Desktop is installed
3. Run is213-user.sql to create a user that can access the database on any host. Authenticate to the database as this user.
4. Run the sql files in /barrister_ingredient, /barrister_cocktail, /barrister_user, /barrister_order to set up the individual databases.
5. In the root folder 
6. Run docker-compose up
7. visit localhost:3000 to create your cocktail!
