# This script sets the connection string in an app service 
#
[CmdletBinding()]
param(
    [Parameter(Mandatory = $True)]
    [string]
    $servicePrincipal,

    [Parameter(Mandatory = $True)]
    [string]
    $servicePrincipalSecret,

    [Parameter(Mandatory = $True)]
    [string]
    $servicePrincipalTenantId,

    [Parameter(Mandatory = $True)]
    [string]
    $azureSubscriptionName,

    [Parameter(Mandatory = $True)]
    [string]
    $resourceGroup,

    [Parameter(Mandatory = $True)]
    [string]
    $appService,

    [Parameter(Mandatory = $True)]
    [string]
    $connectionStringType,

    [Parameter(Mandatory = $True)]
    [string]
    $connectionString,

    [Parameter(Mandatory = $True)]
    [string]
    $connectionStringName
)

#region show input parameters
Write-Output "servicePrincipal: $servicePrincipal"
Write-Output "servicePrincipalTenat: $servicePrincipalTenant"
Write-Output "servicePrincipalSecret: $servicePrincipalSecret"
Write-Output "azureSubcriptionName: $azureSubscriptionName"
Write-Output "resourceGroup: $resourceGroup"
Write-Output "appService: $appService"
Write-Output "connectionStringType: $connectionStringType"
Write-Output "connectionString: $connectionString"
Write-Output "connectionStringName: $connectionStringName"
Write-Output ""
#endregion




#region Login
# This logs in a service principal
#
Write-Output "Logging in to Azure with a service principal..."
az login `
    --service-principal `
    --username $servicePrincipal `
    --password $servicePrincipalSecret `
    --tenant $servicePrincipalTenantId
Write-Output "Done"
Write-Output ""

# This sets the subscription to the subscription I need all my apps to
# run in
#
Write-Output "Setting default azure subscription..."
az account set `
    --subscription $azureSubscriptionName
Write-Output "Done"
Write-Output ""
#endregion

#region Set Connection String
# This sets the connection string using the azure cli
#
Write-Output "Setting connection string.."
az webapp config connection-string set `
    --name $appService `
    --connection-string-type $connectionStringType `
    --resource-group $resourceGroup `
    --settings $connectionStringName="$connectionString"
Write-Output "Done setting connection string"
#endregion