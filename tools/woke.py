#coding:utf-8

import random
import MySQLdb
def connect(user, password, db):
    db = MySQLdb.connect(host="localhost", user=user, passwd=password, db=db, charset='utf8')
    cursor = db.cursor()
    return db, cursor


def change_category_item_weight(db, cursor, category_id):
    sql = "select id from storage_item where category_id=%d"%(category_id)
    cursor.execute(sql)
    results = cursor.fetchall()
    for result in results:
        sql = 'update storage_item set weight=%d where id=%d'%(random.randint(100, 10000), result[0])
        cursor.execute(sql)
    db.commit()


def make_recommend_item(db, cursor):
    item_count = 6000
    sql = 'select id from homepage_hot where valid=1'
    cursor.execute(sql)
    results = cursor.fetchall()
    for cate in results:
        sql = 'delete from homepage_hot_items where hot_id=%d' % (cate[0])
        cursor.execute(sql)
        db.commit()

        arrs = {}
        for _ in range(300):
            ids = random.randint(1, item_count)
            while ids in arrs:
                ids = random.randint(1, item_count)
            arrs[ids] = True
            sql = 'insert into homepage_hot_items(hot_id,item_id) values(%d,%d)'%(cate[0], ids)
            cursor.execute(sql)
    db.commit()


if __name__ == '__main__':
    db,cursor = connect("beesodba", "Fuck!@#$1234beeso", "beesodb")
    sql = "select id from storage_category where showed=1"
    cursor.execute(sql)
    for cate in cursor.fetchall():
        change_category_item_weight(db, cursor, cate[0])
    make_recommend_item(db, cursor)
