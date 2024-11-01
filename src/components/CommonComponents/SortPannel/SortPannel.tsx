"use client";

import sortStyles from "./sortPannel.module.css";
import { Select } from "../Select/Select";
import { useState, MouseEvent, Dispatch, useEffect } from "react";
import {
  foodSortReducerProps,
  mealOptions,
  sortValues,
} from "@/reducers/sortReducer";
import { actionEnam } from "@/reducers/sortReducer";

type SortItemTypes = {
  itemTitle: string;
  options: (mealOptions | sortValues)[];
  choosenOptions: (mealOptions | sortValues)[];
  clickHandler: (e: MouseEvent<HTMLLIElement>) => void;
};

const filterOptions: mealOptions[] = [
  mealOptions.breakfasts,
  mealOptions.desserts,
  mealOptions.lowCarbs,
  mealOptions.mainDishes,
  mealOptions.vegans,
];

const sortOptions: sortValues[] = [
  sortValues.byCalories,
  sortValues.byCarbs,
  sortValues.byFats,
  sortValues.byMeal,
  sortValues.byProteins,
];

type filterOptionComponentProps = {
  optionTitle: mealOptions | sortValues;
  classNames?: string;
};

type SortPannelProps = {
  dispatch: Dispatch<foodSortReducerProps>;
};

const FilterOptionComponent = ({
  optionTitle,
  classNames,
}: filterOptionComponentProps) => {
  const classnames = classNames
    ? `${sortStyles.checkBox} ${classNames}`
    : `${sortStyles.checkBox}`;
  return (
    <div className={sortStyles.filterOption}>
      <div className={classnames}></div>
      {optionTitle}
    </div>
  );
};

const SortItem = ({
  itemTitle,
  options,
  choosenOptions,
  clickHandler,
}: SortItemTypes) => {
  return (
    <div className={sortStyles.sortItemContainer}>
      <Select currentValue={itemTitle} clickHandler={clickHandler}>
        {options.map((op, ind) => (
          <FilterOptionComponent
            key={ind}
            optionTitle={op}
            classNames={
              choosenOptions.includes(op) ? `${sortStyles.selected}` : ""
            }
          />
        ))}
      </Select>
    </div>
  );
};

const SortPannel = ({ dispatch }: SortPannelProps) => {
  const [choosenFilterOptions, setChoosenFilterOptions] = useState<
    mealOptions[]
  >([]);
  const [choosenSortOptions, setChoosenSortOptions] = useState<sortValues[]>(
    []
  );

  const clickHandler = (e: MouseEvent<HTMLLIElement>) => {
    const selectedOption = e.currentTarget.textContent as
      | mealOptions
      | sortValues;

    if (filterOptions.includes(selectedOption as mealOptions)) {
      if (choosenFilterOptions.includes(selectedOption as mealOptions)) {
        setChoosenFilterOptions(
          choosenFilterOptions.filter((op) => op !== selectedOption)
        );
      } else {
        setChoosenFilterOptions([
          ...choosenFilterOptions,
          selectedOption as mealOptions,
        ]);
      }
    }

    if (sortOptions.includes(selectedOption as sortValues)) {
      if (choosenSortOptions.includes(selectedOption as sortValues)) {
        setChoosenSortOptions(
          choosenSortOptions.filter((op) => op !== selectedOption)
        );
      } else {
        setChoosenSortOptions([
          ...choosenSortOptions,
          selectedOption as sortValues,
        ]);
      }
    }
  };

  useEffect(() => {
    dispatch({
      type: actionEnam.filterAction,
      payload: choosenFilterOptions,
    });
  }, [choosenFilterOptions]);

  useEffect(() => {
    if (choosenSortOptions.length === 0 && choosenFilterOptions.length === 0) {
      dispatch({
        type: actionEnam.resetData,
      });
      return;
    }
    if (choosenFilterOptions.length === 0) {
      dispatch({
        type: actionEnam.resetData,
      });
      dispatch({
        type: actionEnam.sortAction,
        payload: choosenSortOptions,
      });
    }
  }, [choosenFilterOptions]);

  useEffect(() => {
    dispatch({
      type: actionEnam.sortAction,
      payload: choosenSortOptions,
    });
  }, [choosenSortOptions]);

  useEffect(() => {
    if (choosenSortOptions.length === 0 && choosenFilterOptions.length === 0) {
      dispatch({
        type: actionEnam.resetData,
      });
      return;
    }
    if (choosenSortOptions.length === 0) {
      dispatch({
        type: actionEnam.filterAction,
        payload: choosenFilterOptions,
      });
      return;
    }
    dispatch({
      type: actionEnam.sortAction,
      payload: choosenSortOptions,
    });
  }, [choosenSortOptions]);

  return (
    <div className={sortStyles.sortContainer}>
      <SortItem
        itemTitle="Filter by"
        options={filterOptions}
        choosenOptions={choosenFilterOptions}
        clickHandler={clickHandler}
      />
      <SortItem
        itemTitle="Sort by"
        options={sortOptions}
        choosenOptions={choosenSortOptions}
        clickHandler={clickHandler}
      />
    </div>
  );
};

export default SortPannel;
