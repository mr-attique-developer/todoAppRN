import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const TodoItems = ({task, handleChecked, deleteItem, editItem}) => {
  return (
    <View>
      <View style={styles.taskContainer}>
        <View style={{flexDirection: 'row'}}>
          <BouncyCheckbox
            size={25}
            fillColor="blue"
            unFillColor="#FFFFFF"
            isChecked={task.checked}
            onPress={() => handleChecked(task.id)}
            text="Task"
            iconStyle={{borderColor: 'blue'}}
            innerIconStyle={{borderWidth: 2}}
            textStyle={{
              fontFamily: 'JosefinSans-Regular',
              fontSize: 20,
              color: 'blue',
              zIndex: 100,
            }}
          />
          <Text style={[{fontSize: 18, fontWeight: 'bold'} , task.checked ? {textDecorationLine:"line-through", fontWeight:'normal'} :null]} >{task.text}</Text>
        </View>
        {
          !task.checked &&

          <View style={styles.btnContainer}>
          <Pressable onPress={()=>editItem(task.id)}>
            <Text style={styles.btnEdit}>Edit</Text>
          </Pressable>
          <Pressable onPress={()=>deleteItem(task.id)}>
            <Text style={styles.btnDelete}>Delete</Text>
          </Pressable>
        </View>
        }
        
      </View>
    </View>
  );
};
export default TodoItems;

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    boxShadow: '0px 2px 0px 0px rgba(0,0,0,0.75)',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  btnEdit: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 15,
  },
  btnDelete: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
