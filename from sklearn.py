from sklearn.tree import DecisionTreeClassifier, export_text

# กำหนดข้อมูล
data = [
    ["มี", "มี", "ถูกต้อง", "ลงทะเบียนสำเร็จ"],
    ["มี", "มี", "ไม่ถูกต้อง", "มีคอร์สที่มีการเรียนซ้ำกันในเวลานี้แล้ว"],
    ["มี", "ไม่มี", "-", "ไม่แสดงรายวิชา"],
    ["ไม่มี", "มี", "-", "กรุณาเข้าสู่ระบบ"]
]

# แบ่งข้อมูลเป็น features (X) และ labels (y)
X = [row[:-1] for row in data]
y = [row[-1] for row in data]

# สร้าง Decision Tree Classifier
clf = DecisionTreeClassifier()
clf = clf.fit(X, y)

# แสดง Decision Tree ในรูปแบบข้อความ
tree_rules = export_text(clf, feature_names=["บัญชี", "คอร์ส", "วัน-เวลา"])
print(tree_rules)
