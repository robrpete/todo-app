import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, primaryKey, varchar, datetime, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const todo = mysqlTable("Todo", {
	id: varchar("id", { length: 191 }).notNull(),
	createdAt: datetime("createdAt", { mode: 'string', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
	updatedAt: datetime("updatedAT", { mode: 'string', fsp: 3 }).default(sql`CURRENT_TIMESTAMP(3)`).notNull(),
	text: varchar("text", { length: 191 }).notNull(),
	done: tinyint("done").default(0).notNull(),
	userId: varchar("userId", { length: 191 }).notNull(),
},
(table) => {
	return {
		userIdIdx: index("Todo_userId_idx").on(table.userId),
		todoId: primaryKey(table.id),
	}
});

export const user = mysqlTable("User", {
	id: varchar("id", { length: 191 }).notNull(),
	name: varchar("name", { length: 191 }).notNull(),
},
(table) => {
	return {
		userId: primaryKey(table.id),
	}
});