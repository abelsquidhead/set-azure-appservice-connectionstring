#!/bin/bash

# this script sets the connection string in an app service
#

# Get command line variables
servicePrincipal=$1
servicePrincipalTenant=$2
servicePrincipalSecret=$3

echo "servicePrincipal: $servicePrincipal"
echo "servicePrincipalTenat: $servicePrincipalTenant"
echo "servicePrincipalSecret: $servicePrincipalSecret"


# # This creates the resource group used to house this application
# #
# echo "Creating resource group $IAC_EXCLUSIVE_RESOURCEGROUPNAME in region $IAC_RESOURCEGROUPREGION"
# az group create \
#     --name $IAC_EXCLUSIVE_RESOURCEGROUPNAME \
#     --location $IAC_RESOURCEGROUPREGION
# echo "Done creating resource group"
# echo ""