"use strict";

/** #region Basic Usage of class
 *
 * 	*** Basic usage of INSERT ***
 * 	var query = queryBuilderobj
 * 					.insert(['username' , 'email' ,'password'])
 * 					.into('accounts')
 * 					.columnValues(['username1', 'example@mail.com', 'sensitiveinfo']);
 *
 * *** Basic usage of DELETE ***
 *  var query = queryBuilderobj
 * 					.delete()
 * 					.from('accounts')
 * 					.where('accountid', 8);
 *
 * *** Basic usage of UPDATE ***
 *  var query = queryBuilderobj
 * 					.update('accounts')
 * 					.set('username', 'newusername')
 * 					.andSet('email', 'new@mail.com')
 * 					.where('accountid', 7)
 * 					.orderBy(['username', 'email'], 1);
 *
 * *** Basic usage of SELECT with multiple tables ***
 * 	var query = queryBuilderobj
 * 					.selectMultiTable([
 * 						['orders', 'customer'],
 * 						['orderid', 'orderdate'],
 * 						['customername' ]
 * 					])
 * 					.from('Orders')
 * 					.innerJoin('Customer')
 * 					.on('orders.customerID = customer.customerID');
 * #endregion
 */

class QueryBuilder {

	constructor() {
		this.queryText = "";
		this.params = [];
	}


	/**
	 * @description Adds a ***SELECT*** clause to select all columns of table
	 * @usage Basic usage - *.**selectAll**()*
	 * @returns {QueryBuilder}
	 */
	selectAll() {
		this.queryText = `SELECT  * `;
		return this;
	}


	/**
	 * @description Adds a ***SELECT*** clause
	 * @usage Basic usage - *.**select**(['id', 'name'])*
	 * @param {Array} columnsToSelect
	 * @returns {QueryBuilder}
	 */
	select(columnsToSelect) {
		var query = "";
		for (var i = 0; i < columnsToSelect.length; i++) {
			query += (i != columnsToSelect.length - 1)
				? columnsToSelect[i] + ', '
				: columnsToSelect[i];
		}
		this.queryText = `SELECT  ${query} `;
		return this;
	}


	/**
	 * @description Adds a ***FROM*** clause for ***SELECT*** or ***DELETE***
	 * @usage Basic usage - *select(...).**from**('orders')*
	 * @param {String} tableName
	 * @returns {QueryBuilder}
	 */
	from(tableName) {
		this.queryText += ` FROM  ${tableName} `;
		return this;
	}


	/**
	 * @description Adds a ***WHERE != *** clause for **=** ** Not Equal**
	 * @usage Basic usage - *.**whereNot**('amount',60)*
	 * @param {String} column
	 * @param {Any} value
	 * @returns {QueryBuilder}
	 */
	whereNot(column, value) {
		this.queryText += ` WHERE  ${column} != ? `;
		this.params.push({
			columnName: column,
			value: value
		});
		return this;
	}


	/**
	 * @description Adds a ***WHERE*** clause for **=** **Equal**
	 * @usage Basic usage - *.**where**('amount',60)*
	 * @param {String} column
	 * @param {Any} value
	 * @returns {QueryBuilder}
	 */
	where(column, value) {
		this.queryText += ` WHERE  ${column} = ? `;
		this.params.push({
			columnName: column,
			value: value
		});
		return this;
	}

	whereNonParameterize(clause) {
		this.queryText += ` WHERE ${clause} `;
		return this;
	}

	where_greaterThanOrEqual(column, value) {
		this.queryText += ` WHERE ${column} >= ? `;
		this.params.push({
			columnName: column,
			value: value
		});
		return this;
	}


	/**
	 * @description Adds a ***WHERE*** clause with ***AND*** for **=** **Equal**
	 * @usage Basic usage - *where(...)...**andWhere**('amount',60)*
	 * @param {String} column
	 * @param {Any} value
	 * @returns {QueryBuilder}
	 */
	andWhere(column, value) {
		this.queryText += ` AND  ${column} = ? `;
		this.params.push({
			columnName: column,
			value: value
		});
		return this;
	}


	andWhereNonParameterize(clause) {
		this.queryText += ` AND  ${clause} `;
		return this;
	}


	/**
	 * @description Adds a ***WHERE*** clause with ***OR*** for **=** **Equal**
	 * @usage Basic usage - *where(...)...**orWhere**('amount',60)*
	 * @param {String} column
	 * @param {Any} value
	 * @returns {QueryBuilder}
	 */
	orWhere(column, value) {
		this.queryText += ` OR ${column} = ? `;
		this.params.push({
			columnName: column,
			value: value
		});
		return this;
	}


	/**
	 * @description Adds a ***WHERE*** clause with ***AND*** for **>=** **GreaterThan**
	 * @usage Basic usage - *where(...)...**andWhere_greaterThan**('amount',60)*
	 * @param {String} column
	 * @param {Any} value
	 * @returns {QueryBuilder}
	 */
	andWhere_greaterThan(column, value) {
		this.queryText += ` AND ${column} > ? `;
		this.params.push({
			columnName: column,
			value: value
		});
		return this;
	}


	/**
	 * @description Adds a ***WHERE*** clause with ***AND*** for **>=** **GreaterThanOrEqual**
	 * @usage Basic usage - *where(...)...**andWhere_greaterThanOrEqual**('amount',60)*
	 * @param {String} column
	 * @param {Any} value
	 * @returns {QueryBuilder}
	 */
	andWhere_greaterThanOrEqual(column, value) {
		this.queryText += ` AND ${column} >= ? `;
		this.params.push({
			columnName: column,
			value: value
		});
		return this;
	}


	/**
	 * @description Adds a ***WHERE*** clause with ***AND*** for **<** **LessThan**
	 * @usage Basic usage - *where(...)...**andWhere_lessThan**('amount',60)*
	 * @param {String} column
	 * @param {Any} value
	 * @returns {QueryBuilder}
	 */
	andWhere_lessThan(column, value) {
		this.queryText += ` AND ${column} < ? `;
		this.params.push({
			columnName: column,
			value: value
		});
		return this;
	}


	/**
	 * @description Adds a ***WHERE*** clause with ***OR*** for **<=** **LessThanOrEqual**
	 * @usage Basic usage - *where(...)...**andWhere_lessThanOrEqual**('amount',60)*
	 * @param {String} column
	 * @param {Any} value
	 * @returns {QueryBuilder}
	 */
	andWhere_lessThanOrEqual(column, value) {
		this.queryText += ` AND ${column} <= ? `;
		this.params.push({
			columnName: column,
			value: value
		});
		return this;
	}


	/**
	 * @description Adds a ***WHERE*** clause with ***OR*** for **>** **GreaterThan**
	 * @usage Basic usage - *where(...)...**orWhere_greaterThan**('amount',60)*
	 * @param {String} column
	 * @param {Any} value
	 * @returns {QueryBuilder}
	 */
	orWhere_greaterThan(column, value) {
		this.queryText += ` OR ${column} > ? `;
		this.params.push({
			columnName: column,
			value: value
		});
		return this;
	}


	/**
	 * @description Adds a ***WHERE*** clause with ***OR*** for **<** **LessThan**
	 * @usage Basic usage - *where(...)...**orWhere_lessThan**('amount',60)*
	 * @param {String} column
	 * @param {Any} value
	 * @returns {QueryBuilder}
	 */
	orWhere_lessThan(column, value) {
		this.queryText += ` OR ${column} < ? `;
		this.params.push({
			columnName: column,
			value: value
		});
		return this;
	}


	/**
	 * @description SETS columns to be inserted in ***INSERT*** clause
	 * @usage Basic usage - *.**insert**(['id', 'customerName']).into('customers')*
	 * @param {Array} columnsToInsert
	 * @returns {QueryBuilder}
	 */
	insert(columnsToInsert) {
		var query = "";
		for (var i = 0; i < columnsToInsert.length; i++) {
			query += (i != columnsToInsert.length - 1)
				? columnsToInsert[i] + ', '
				: columnsToInsert[i];
		}

		this.queryText = query;
		return this;
	}


	/**
	 * @description SETS Table of Insertion for ***INSERT*** clause
	 * @usage Basic usage - *insert(......).**into**('customers')*
	 * @param {String} tableName
	 * @returns {QueryBuilder}
	 */
	into(tableName) {
		this.queryText = `INSERT INTO ${tableName} (${this.queryText}) `;
		return this;
	}


	/**
	 * @description SETS Column Values after ***INSERT*** clause
	 * @usage Basic usage - *.**columnValues**([45, 'SomeTxt', 0])*
	 * @param {Array} params
	 * @returns {QueryBuilder}
	 */
	columnValues(columnsValues) {
		var query = "";
		for (var i = 0; i < columnsValues.length; i++) {
			query += (i != (columnsValues.length - 1)) ? '?,' : '?';
			this.params.push({
				columnName: columnsValues[i],
				value: columnsValues[i]
			});
		}
		this.queryText += ` VALUES (${query})`;
		return this;
	}


	/**
	 * @description DEFINES SQL ***DELETE*** clause
	 * @usage Basic usage - *.**delete()**.from(......)*
	 * @returns {QueryBuilder}
	 */
	delete() {
		this.queryText = "";
		this.queryText = " DELETE ";
		return this;
	}


	/**
	 * @description DEFINES SQL ***UPDATE*** clause
	 * @usage Basic usage - *.**update**('orders')*
	 * @param {String} tableName
	 * @returns {QueryBuilder}
	 */
	update(tableName) {
		this.queryText = "";
		this.queryText = ` UPDATE  ${tableName} `;
		return this;
	}


	/**
	 * @description Sets Column value for SQL ***UPDATE***
	 * @usage Basic usage - *.**set**('customerId', 45)*
	 * @param {String} column
	 * @param {Any} value
	 * @returns {QueryBuilder}
	 */
	set(column, value) {
		this.queryText += ` SET ${column} = ? `;
		this.params.push({
			columnName: column,
			value: value
		});
		return this;
	}


	/**
	 * @description Sets Column value for SQL ***UPDATE***
	 * @usage Basic usage - *set(......).**andSet**('customerId', 45)*
	 * @param {String} column
	 * @param {Any} value
	 * @returns {QueryBuilder}
	 */
	andSet(column, value) {
		this.queryText += `, ${column} = ? `;
		this.params.push({
			columnName: column,
			value: value
		});
		return this;
	}


	/**
	 * @description Defines SQL ***ORDER BY*** clause
	 * @usage Basic usage - *.**orderBy**('customer_id', 0)*
	 * @param {String} columnfororder
	 * @param {Number} way order - **0=>DESC, 1=>ASC**
	 * @returns {QueryBuilder}
	 */
	orderBy(columnfororder, way) {
		this.queryText += ` ORDER BY ${columnfororder} ${way == 0 ? 'DESC' : 'ASC'}`;
		return this;
	}


	/**
	 * @description Defines SQL ***LIMIT*** clause
	 * @usage Basic usage -  *.**limit**(50)*
	 * @param {Number} lmt
	 * @returns {QueryBuilder}
	 */
	limit(lmt) {
		this.queryText += ` LIMIT ${lmt} `;
		return this;
	}


	/**
	 * @description Defines SQL ***OFFSET*** clause
	 * @usage Basic usage - *.**offset**(25)*
	 * @param {Number} lmt
	 * @returns {QueryBuilder}
	 */
	offset(lmt) {
		this.queryText += ` OFFSET ${lmt} `;
		return this;
	}


	/**
	 * @description Defines SQL ***SELECT*** clause to select from **Multiple tables**, used along with ***JOINS***.
	 * @usage Basic usage - *.**selectMultiTable**([
	 * 		['table1', 'table2', ...],
	 * 		['columnT1A', 'columnT1B', ...],
	 *  	['column2A', 'columnT2B', ...],
	 * 		[ ...]
	 *	])*
	 * @param {Array} arrayofcolumns
	 * @returns {QueryBuilder}
	 */
	selectMultiTable(arrayofcolumns) {
		var query = "";

		for (var i = 1; i < arrayofcolumns.length; i++) {
			var columns = arrayofcolumns[i];
			var currenttable = arrayofcolumns[0][i - 1];

			for (var j = 0; j < columns.length; j++) {
				if(columns[j].includes('COALESCE_CUSTOM'))	{
					let nullReplacement = columns[j].substr(columns[j].lastIndexOf(',')+2)
					nullReplacement = nullReplacement.substr(0,nullReplacement.lastIndexOf(')')-1)

					var column = columns[j].substring(16,columns[j].lastIndexOf(','));
					var remainingString = columns[j].substring(columns[j].lastIndexOf(','),columns[j].length);

					let aliasesIdx;
					if ( remainingString.indexOf('AS') != -1 ) aliasesIdx =remainingString.indexOf('AS');
					if ( remainingString.indexOf('as') != -1 ) aliasesIdx =remainingString.indexOf('as');
					if ( remainingString.indexOf('As') != -1 ) aliasesIdx =remainingString.indexOf('As');

					let aliases = remainingString.substring(aliasesIdx,remainingString.length);
					query += `COALESCE(${currenttable}.${column}, '${nullReplacement}')`+aliases+`,`;
				}
				else if(columns[j].includes('COALESCE'))	{
					var column = columns[j].substring(9,columns[j].lastIndexOf(','));
					var remainingString = columns[j].substring(columns[j].lastIndexOf(','),columns[j].length);

					let aliasesIdx;
					if ( remainingString.indexOf('AS') != -1 ) aliasesIdx =remainingString.indexOf('AS');
					if ( remainingString.indexOf('as') != -1 ) aliasesIdx =remainingString.indexOf('as');
					if ( remainingString.indexOf('As') != -1 ) aliasesIdx =remainingString.indexOf('As');

					let aliases = remainingString.substring(aliasesIdx,remainingString.length);
					query += `COALESCE(${currenttable}.${column}, 0)`+aliases+`,`;
				}
				else{
					query += `${currenttable}.${columns[j]},`;
				}
			}
		}
		this.queryText = `SELECT ${query.substr(0, query.length - 1)} `;
		return this;
	}


	/**
	 * @description Defines SQL ***INNER JOIN***
	 * @usage Basic usage - *.**innerJoin**('orders')*
	 * @param {String} tablename
	 * @returns {QueryBuilder}
	 */
	innerJoin(tablename) {
		this.queryText += ` INNER JOIN ${tablename} `;
		return this;
	}


	/**
	 * @description Defines SQL ***LEFT JOIN***
	 * @usage Basic usage - *.**leftJoin**('orders')*
	 * @param {String} tablename
	 * @returns {QueryBuilder}
	 */
	leftJoin(tablename) {
		this.queryText += ` LEFT JOIN ${tablename} `;
		return this;
	}


	/**
	 * @description Defines SQL ***RIGHT JOIN***
	 * @usage Basic usage - *.**rightJoin**('orders')*
	 * @param {String} tablename
	 * @returns {QueryBuilder}
	 */
	rightJoin(tablename) {
		this.queryText += ` RIGHT JOIN ${tablename} `;
		return this;
	}


	/**
	 * @description Defines Object relation with SQL ***ON***
	 * @usage Basic usage - *.**on**('orders.**customerID** = customer.**customerID**')*
	 * @param {String} mapping
	 * @returns {QueryBuilder}
	 */
	on(mapping) {
		this.queryText += ` ON ${mapping} `;
		return this;
	}


	/**
	 * @description Defines SQL ***GROUP BY*** clause
	 * @usage Basic usage -  *.**groupBy**('orders.customerID')*
	 * @param {String} group
	 * @returns {QueryBuilder}
	 */
	groupBy(group){
		this.queryText += ` GROUP BY ${group} `;
		return this;
	}


	/**
	 * @description Returns all the query parameters as an array.
	 * @usage  Basic usage - *.**getParamValuesOnly**()*
	 * @returns {Array} paramValues
	 */
	getParamValuesOnly() {
		var paramsvalue = [];
		// get params values array
		for (var i = 0; i < this.params.length; i++) {
			paramsvalue.push(this.params[i].value);
		}
		return paramsvalue;
	}
}

module.exports = QueryBuilder
